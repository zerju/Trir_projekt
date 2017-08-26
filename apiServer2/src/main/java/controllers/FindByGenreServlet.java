package controllers;

import DAO.Game;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Response;
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
//localhost:8080/findByGenre?genre=Arcade game
@WebServlet(name = "FindByGenre", urlPatterns = "/findByGenre")
public class FindByGenreServlet extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        String genre = req.getParameter("genre");
        PrintWriter out = resp.getWriter();
        ArrayList<String> resultArray = new ArrayList<String>();
        ObjectMapper mapper = new ObjectMapper();
        String queryString=
                "PREFIX dbo: <http://dbpedia.org/ontology/> \n" +
                        "PREFIX dbp: <http://dbpedia.org/property/> \n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n" +
                        "PREFIX dbr: <http://dbpedia.org/resource/> \n" +
                        "\n" +
                        "select distinct ?Concept ?title ?genre where {?Concept a dbo:VideoGame . \n"+
                        "?Concept dbo:genre ?x. \n"+
                        "?x rdfs:label ?genre. \n"+
                        "?Concept rdfs:label ?title."+
                        "values ?genre {\""+genre+"\"@en}. \n"+
                        "FILTER (lang(?title) = 'en')"+
                        "} ";


        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.sparqlService("http://dbpedia.org/sparql", query);
        ArrayList<String> foundGenres = new ArrayList<String>();

        try {
            ResultSet results = qexec.execSelect();
            results = ResultSetFactory.copyResults(results) ;
            for (; results.hasNext();) {
                Game game = new Game();
                QuerySolution binding = results.nextSolution();
                Resource resource = (Resource) binding.get("Concept");
                LiteralImpl  title = (LiteralImpl) binding.get("title");
                LiteralImpl  genreLit = (LiteralImpl) binding.get("genre");
                game.setResource(resource.toString());
                game.setName(title.toString());
                foundGenres.add(genreLit.toString());
                game.setGenre(genreLit.toString());
                String jsonInString = mapper.writeValueAsString(game);
                resultArray.add(jsonInString);
            }
        }
        finally {
            qexec.close();
        }


        out.print(resultArray);
        out.flush();
    }
}
