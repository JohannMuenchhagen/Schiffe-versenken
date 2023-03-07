package com.Datastorage.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import org.springframework.http.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/game")
@RequiredArgsConstructor
public class DatenbankController {
	
	private final GameRepository gameRepo;
	private final GameNumbersRepository numberRepo;
	private final NumberService numberService; 

	@GetMapping("/get")
    public ResponseEntity<String> getGame(@RequestHeader("gameId") String gameId){
    	Game game = gameRepo.findByGameId(gameId);
    	if(game==null) {
    		return ResponseEntity.notFound().build();		
    	}
    	numberService.getGame(game.getGameId());
    	gameRepo.delete(game);
    	return ResponseEntity.ok(game.getJson());
    }
	
	@GetMapping("/getgamenumbers")
    public ResponseEntity<ArrayList<String>> getGameNumbers(){
		StoredGameIds gameIds = numberRepo.findByDocumentId(1);
    	if(gameIds==null) {
    		return ResponseEntity.notFound().build();		
    	}
    	return ResponseEntity.ok(gameIds.getGameIds());
    }
	
    @PostMapping("/save")
    public ResponseEntity<Game> savegame(@RequestBody Parameter parameter) {
    	Game game = new Game(parameter.getSpielId(), parameter.getJson());
    	gameRepo.save(game);
    	numberService.saveGame(game.getGameId());
    	return ResponseEntity.ok(null);
    }

}
