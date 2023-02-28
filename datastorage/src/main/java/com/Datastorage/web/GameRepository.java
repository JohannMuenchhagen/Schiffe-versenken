package com.Datastorage.web;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameRepository extends MongoRepository<Game, String>{
	
	public Game findBySpielId(String spielID);

}
