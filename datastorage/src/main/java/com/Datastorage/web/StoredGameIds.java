package com.Datastorage.web;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document
public class StoredGameIds {

	@Id
	private String id;
	
	@Indexed
	@Field
	private int documentId;
	
	@Field
	private ArrayList<String> gameIds;
	
	public StoredGameIds(int documentId, ArrayList<String> gameIds) {
		this.documentId=documentId;
		this.gameIds=gameIds;
	}
}
