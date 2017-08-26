package controllers;

import DAO.Game;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.impl.LiteralImpl;
import org.apache.jena.rdf.model.impl.ResourceImpl;

/**
 * Created by Jure on 26. 08. 2017.
 */
//localhost:8080/findGenres
@WebServlet(name = "findGenres", urlPatterns = "/findGenres")
public class GenresFindServlet extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        PrintWriter out = resp.getWriter();
        ArrayList<String> resultArray = new ArrayList<String>();
        ObjectMapper mapper = new ObjectMapper();
        String queryString=
                "PREFIX dbo: <http://dbpedia.org/ontology/> \n" +
                        "PREFIX dbp: <http://dbpedia.org/property/> \n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n" +
                        "PREFIX dbr: <http://dbpedia.org/resource/> \n" +
                        "\n" +
                        "select distinct ?genreName where {?Concept a dbo:VideoGame .\n" +
                        " ?Concept dbo:genre ?genre .\n" +
                        "?genre rdfs:label ?genreName .\n" +
                        " FILTER (lang(?genreName) = 'en').\n" +
                        "} ";


        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.sparqlService("http://dbpedia.org/sparql", query);
        try {
            ResultSet results = qexec.execSelect();
            results = ResultSetFactory.copyResults(results) ;
            for (; results.hasNext();) {
                QuerySolution binding = results.nextSolution();
                LiteralImpl  subj = (LiteralImpl) binding.get("genreName");

                resultArray.add(subj.toString());
            }
        }
        finally {
            qexec.close();
        }



        out.print(resultArray);
        out.flush();
    }
}
