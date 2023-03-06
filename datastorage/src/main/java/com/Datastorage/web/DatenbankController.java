package com.Datastorage.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/game")
@RequiredArgsConstructor
public class DatenbankController {
	
	private final GameRepository repo;
	  

	@GetMapping("/get")
    public ResponseEntity<String> getGame(@RequestHeader("gameId") String gameId){
    	Game game = repo.findBySpielId(gameId);
    	if(game==null) {
    		return ResponseEntity.notFound().build();		
    	}
    	repo.delete(game);
    	return ResponseEntity.ok(game.getJson());

    }
	
    @PostMapping("/save")
    public ResponseEntity<Game> savegame(@RequestBody Parameter parameter) {
    	Game game = new Game(parameter.getSpielId(), parameter.getJson());
    	repo.save(game);
    	return ResponseEntity.ok(null);
    }

}
