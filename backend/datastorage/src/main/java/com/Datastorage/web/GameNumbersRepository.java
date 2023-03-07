package com.Datastorage.web;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameNumbersRepository extends MongoRepository<StoredGameIds, String>{

	public StoredGameIds findByDocumentId(int documentId);
}
