package com.trir.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trir.DAO.Game;
import com.trir.DAO.Genre;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.impl.LiteralImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

/**
 * Created by Jure on 27. 08. 2017.
 */
//localhost:8080/findAll
@RestController
public class FindAll {
    @CrossOrigin
    @RequestMapping(path = "/findAll", method = RequestMethod.GET)
    public ArrayList<Game> findGenres() {
        return getGames();
    }

    ArrayList<Game> getGames(){
        ArrayList<Game> resultArray = new ArrayList<Game>();
        String queryString=
                "PREFIX dbo: <http://dbpedia.org/ontology/> \n" +
                        "PREFIX dbp: <http://dbpedia.org/property/> \n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n" +
                        "PREFIX dbr: <http://dbpedia.org/resource/> \n" +
                        "\n" +
                        "select distinct ?Concept where {?Concept a dbo:VideoGame} LIMIT 300";


        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.sparqlService("http://dbpedia.org/sparql", query);
        try {
            ResultSet results = qexec.execSelect();
            results = ResultSetFactory.copyResults(results) ;
            for (; results.hasNext();) {
                QuerySolution binding = results.nextSolution();
                Resource subj = (Resource) binding.get("Concept");
                String oneGameQuery = "PREFIX dbo: <http://dbpedia.org/ontology/> \n" +
                        "PREFIX dbp: <http://dbpedia.org/property/> \n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n" +
                        "PREFIX dbr: <http://dbpedia.org/resource/> \n" +
                        "\n" +
                        "select ?title ?genre where { <"+ subj.toString() +"> rdfs:label ?title . \n" +
                        "<" + subj.toString() +"> dbo:genre ?genreTemp .\n" +
                        "?genreTemp rdfs:label ?genre\n" +
                        " FILTER (lang(?title) = 'en').\n" +
                        " FILTER (lang(?genre) = 'en').\n" +
                        "}";
                QueryExecution qexec2 = QueryExecutionFactory.sparqlService("http://dbpedia.org/sparql", oneGameQuery);
                ResultSet results2 = qexec2.execSelect();
                results2 = ResultSetFactory.copyResults(results2) ;
                Game game = new Game();
                if(results2.hasNext()) {
                    QuerySolution binding2 = results2.nextSolution();
                    // Resource subj2 = (Resource) binding2.get("Composer");
                    LiteralImpl title = (LiteralImpl) binding2.get("title");
                    LiteralImpl genre = (LiteralImpl) binding2.get("genre");
                    game.setName(title.toString());
                    if(genre != null)
                        game.setGenre(genre.toString());
                }
                resultArray.add(game);
            }
        }
        finally {
            qexec.close();
            return resultArray;
        }
    }

}
