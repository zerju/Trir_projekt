package com.trir.controllers;

import com.trir.DAO.GameDetail;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.impl.LiteralImpl;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

/**
 * Created by Jure on 27. 08. 2017.
 */
//localhost:8080/details?resource=http://dbpedia.org/resource/Dr._Mario
@RestController
public class GameDetails {
    @CrossOrigin
    @RequestMapping(path = "/details", method = RequestMethod.GET)
    public GameDetail getGame(@RequestParam(value = "resource") String gameResource) {
        return getGameInfo(gameResource);
    }

    GameDetail getGameInfo(String gameResource) {
        ArrayList<String> resultArray = new ArrayList<String>();
        ObjectMapper mapper = new ObjectMapper();
        String queryString =
                "PREFIX dbo: <http://dbpedia.org/ontology/> \n" +
                        "PREFIX dbp: <http://dbpedia.org/property/> \n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n" +
                        "PREFIX dbr: <http://dbpedia.org/resource/> \n" +
                        "\n" +
                        "select ?title  ?composer ?abstract ?platform ?designer ?genre ?thumbnail ?publisher ?developer ?releaseDate where {\n" +
                        "<" + gameResource + "> rdfs:label ?title .\n" +
                        "optional {<" + gameResource + "> dbo:composer ?tempcomp .\n" +
                        " ?tempcomp rdfs:label ?composer.}\n" +
                        "\n" +
                        "<" + gameResource + "> dbo:abstract ?abstract.\n" +
                        "\n" +
                        "optional { <" + gameResource + "> dbo:designer ?tempDes .\n" +
                        " ?tempDes rdfs:label ?designer }.\n" +
                        "\n" +
                        "<" + gameResource + "> dbo:genre ?tempGen .\n" +
                        " ?tempGen rdfs:label ?genre.\n" +
                        "\n" +
                        " optional {<" + gameResource + "> dbo:thumbnail ?thumbnail}.\n" +
                        " optional {<" + gameResource + "> dbo:computingPlatform ?tempPlat .\n" +
                        "           ?tempPlat rdfs:label ?platform}.\n" +
                        " optional {<" + gameResource + "> dbo:publisher ?tempPub.\n" +
                        "           ?tempPub rdfs:label ?publisher }.\n" +
                        " optional {<" + gameResource + "> dbo:developer ?tempDev.\n" +
                        "           ?tempDev rdfs:label ?developer}.\n" +
                        " optional {<" + gameResource + "> dbo:releaseDate ?releaseDate}.\n" +
                        "\n" +
                        "\n" +
                        "\n" +
                        " FILTER (lang(?composer) = 'en') .\n" +
                        "FILTER (lang(?abstract) = 'en') .\n" +
                        "FILTER (lang(?platform) = 'en') .\n" +
                        "FILTER (lang(?designer) = 'en') .\n" +
                        "FILTER (lang(?genre) = 'en') .\n" +
                        "FILTER (lang(?publisher) = 'en') .\n" +
                        "FILTER (lang(?developer) = 'en') .\n" +
                        "FILTER (lang(?title) = 'en') .\n" +
                        " }";


        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.sparqlService("http://dbpedia.org/sparql", query);
        GameDetail game = new GameDetail();
        try {
            ResultSet results = qexec.execSelect();
            results = ResultSetFactory.copyResults(results);
            for (; results.hasNext(); ) {

                QuerySolution binding = results.nextSolution();
                LiteralImpl title = (LiteralImpl) binding.get("title");
                LiteralImpl genreLit = (LiteralImpl) binding.get("genre");
                LiteralImpl composer = (LiteralImpl) binding.get("composer");
                LiteralImpl gameAbs = (LiteralImpl) binding.get("abstract");
                LiteralImpl platform = (LiteralImpl) binding.get("platform");
                LiteralImpl designer = (LiteralImpl) binding.get("designer");
                Resource thumbnail = (Resource) binding.get("thumbnail");
                LiteralImpl publisher = (LiteralImpl) binding.get("publisher");
                LiteralImpl developer = (LiteralImpl) binding.get("developer");
                LiteralImpl releaseDate = (LiteralImpl) binding.get("releaseDate");
                if (game.getName() != null && game.getName().equals(title.toString())) {
                    continue;
                }
                game = new GameDetail();
                if (composer != null) {
                    game.setComposer(composer.toString());
                }
                if (gameAbs != null) {
                    game.setGameAbstract(gameAbs.toString());
                }
                if (platform != null) {
                    game.setPlatform(platform.toString());
                }
                if (designer != null) {
                    game.setDesigner(designer.toString());
                }
                if (thumbnail != null) {
                    game.setThumbnail(thumbnail.toString());
                }
                if (publisher != null) {
                    game.setPublisher(publisher.toString());
                }
                if (developer != null) {
                    game.setDeveloper(developer.toString());
                }
                if (releaseDate != null) {
                    game.setReleaseDate(releaseDate.toString());
                }
                game.setName(title.toString());
                game.setGenre(genreLit.toString());
            }

        }catch (Exception e){
            System.out.println(e.toString());
        }
        finally {
            qexec.close();
            return game;
        }

    }
}
