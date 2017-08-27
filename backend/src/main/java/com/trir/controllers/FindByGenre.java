package com.trir.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trir.DAO.Game;
import com.trir.DAO.GameDetail;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.impl.LiteralImpl;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

/**
 * Created by Jure on 27. 08. 2017.
 */
//localhost:8080/findByGenre?genre=Arcade game
@RestController
public class FindByGenre {
    @CrossOrigin
    @RequestMapping(path = "/findByGenre", method = RequestMethod.GET)
    public ArrayList<Game> getGamesByGenre(@RequestParam(value = "genre") String genre) {
        return getByGenre(genre);
    }

    ArrayList<Game> getByGenre(String genre){
        ArrayList<Game> resultArray = new ArrayList<Game>();
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
                LiteralImpl title = (LiteralImpl) binding.get("title");
                LiteralImpl  genreLit = (LiteralImpl) binding.get("genre");
                game.setResource(resource.toString());
                game.setName(title.toString());
                foundGenres.add(genreLit.toString());
                game.setGenre(genreLit.toString());
                resultArray.add(game);
            }
        }
        finally {
            qexec.close();
            return resultArray;
        }
    }
}
