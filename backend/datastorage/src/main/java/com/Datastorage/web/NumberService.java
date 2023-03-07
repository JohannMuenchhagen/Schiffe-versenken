package com.Datastorage.web;

import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NumberService {

	private final GameNumbersRepository numberRepo;
	
	public void getGame(String gameId) {
		StoredGameIds ids = numberRepo.findByDocumentId(1);
		numberRepo.delete(ids);
		ids.getGameIds().remove(gameId);
		numberRepo.save(ids);
	}
	
	public void saveGame(String gameId) {
		StoredGameIds ids = numberRepo.findByDocumentId(1);
		numberRepo.delete(ids);
		ids.getGameIds().add(gameId);
		numberRepo.save(ids);
	}	
}

