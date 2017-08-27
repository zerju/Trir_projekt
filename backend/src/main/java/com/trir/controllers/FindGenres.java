package com.trir.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trir.DAO.GameDetail;
import com.trir.DAO.Genre;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.impl.LiteralImpl;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

/**
 * Created by Jure on 27. 08. 2017.
 */
//http://localhost:8080/findGenres
@RestController
public class FindGenres {
    @CrossOrigin
    @RequestMapping(path = "/findGenres", method = RequestMethod.GET)
    public ArrayList<Genre> findGenres() {
        return getGenres();
    }

    ArrayList<Genre> getGenres(){
        ArrayList<Genre> resultArray = new ArrayList<Genre>();
        String queryString=
                "PREFIX dbo: <http://dbpedia.org/ontology/> \n" +
                        "PREFIX dbp: <http://dbpedia.org/property/> \n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n" +
                        "PREFIX dbr: <http://dbpedia.org/resource/> \n" +
                        "\n" +
                        "select distinct ?genreName ?genre where {?Concept a dbo:VideoGame .\n" +
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
                Genre genre = new Genre();
                QuerySolution binding = results.nextSolution();
                LiteralImpl genreName = (LiteralImpl) binding.get("genreName");
                Resource genreResource = (Resource) binding.get("genre");
                genre.setName(genreName.toString());
                genre.setResource(genreResource.toString());
                resultArray.add(genre);
            }
        }
        finally {
            qexec.close();
            return resultArray;
        }
    }
}
