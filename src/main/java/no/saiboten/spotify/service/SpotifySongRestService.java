package no.saiboten.spotify.service;

import java.util.List;
import java.util.Map;

import no.saiboten.spotify.bean.SongBean;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SpotifySongRestService {

	private final Logger LOGGER = Logger.getLogger(getClass());

	private RestTemplate restTemplate;

	@Autowired
	public SpotifySongRestService(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	public SongBean getSongFromUri(String uri) {
		SongBean songBean = null;
		try {
			Map<String, Map> result = restTemplate.getForObject(
					"http://ws.spotify.com/lookup/1/.json?uri=" + uri,
					Map.class);
			Map<String, Object> track = result.get("track");
			Map<String, Object> album = (Map<String, Object>) track
					.get("album");
			List<Map<String, String>> artists = (List<Map<String, String>>) track
					.get("artists");

			songBean = new SongBean();
			songBean.setSong((String) track.get("name"));
			songBean.setAlbum((String) album.get("name"));
			songBean.setArtist(artists.get(0).get("name"));
			songBean.setUri(uri);
			songBean.setScore(0);
			LOGGER.debug("Adding song: " + songBean);
		} catch (Exception u) {
			LOGGER.debug("Exception occured: " + u);
		}

		return songBean;
	}

}
