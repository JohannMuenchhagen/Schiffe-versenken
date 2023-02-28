package com.Datastorage.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/game")
@RequiredArgsConstructor
public class DatenbankController {
	
	private final GameRepository repo;
	  
    @PostMapping("/get")
    public ResponseEntity<String> getGame(@RequestBody SearchID spielId){
    	Game game = repo.findBySpielId(spielId.getSpielId());
    	repo.delete(game);
    	return ResponseEntity.ok(game.getJson());
    }
	
    @PostMapping("/save")
    public ResponseEntity<Game> savegame(@RequestBody Parameter parameter) {
    	Game game = new Game(parameter.getSpielId(), parameter.getJson());
    	repo.save(game);
    	return ResponseEntity.ok(game);
    }

}
