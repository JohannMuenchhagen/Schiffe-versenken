package com.Datastorage.web;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document
public class Game {

	@Id
	private String id;
	
	@Indexed
    @Field
    private String gameId;

	@Field
	private String json;
	
	public Game(String spielId, String json) {
		this.gameId=spielId;
		this.json=json;
	}
}
