package no.saiboten.spotify.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import no.saiboten.spotify.bean.SongBean;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaylistService {

	Map<String, Playlist> playlists = new HashMap<String, Playlist>();

	private UserService userService;

	private SpotifySongRestService restService;

	private final Logger LOGGER = Logger.getLogger(getClass());

	@Autowired
	public PlaylistService(UserService userService,
			SpotifySongRestService restService) {
		this.userService = userService;
		this.restService = restService;

		// addNile();
		// addGojira();
	}

	private void addGojira() {
		try {
			Playlist gojira = new Playlist(userService, restService, "gojira");
			gojira.addSong("spotify:track:7f7AkrOCmi5X6Eovd3TiNq");
			gojira.addSong("spotify:track:4PWxt9Fy949kUtkEi2GI5V");
			gojira.addSong("spotify:track:25I6CiICRyGB0K7E9c7Ho0");
			gojira.addSong("spotify:track:5BHLmCLntTLjSFGl8MG5wZ");
			gojira.addSong("spotify:track:1Pa0DVjBUGreCBHIh81G50");
			gojira.addSong("spotify:track:57caEZCym7upL7k7wt5h4o");
			gojira.addSong("spotify:track:3YVwGFmSc1ycqsk6qLNAK3");
			Thread.sleep(5000);
			gojira.addSong("spotify:track:1mjC68qU0Q9HlCIZHZAEko");
			gojira.addSong("spotify:track:341EpTlTyC2YbVAxPurQon");
			gojira.addSong("spotify:track:1rDzUqMRA9VdGCIwzgfeh9");
			gojira.addSong("spotify:track:6WwjzD7ZnIgzWHKyOvGqG1");
			gojira.addSong("spotify:track:5HTPySHVzKat76M1IbiNml");
			gojira.addSong("spotify:track:6TEDqADSZjLJ8sH1q8yQDt");
			playlists.put("gojira", gojira);
			Thread.sleep(5000);
		} catch (Exception u) {
			LOGGER.debug(u);
		}
	}

	private void addNile() {
		try {
			Playlist nile = new Playlist(userService, restService, "nile");
			nile.addSong("spotify:track:2ONXAtDhRcs4GZacLpuoqm");
			nile.addSong("spotify:track:0ldwlCP6SKWvHLDITXiOv2");
			nile.addSong("spotify:track:11jrsgtjJDNkL2LeStN2FO");
			nile.addSong("spotify:track:0ZopGKkBBIwo2AZawyQuju");
			nile.addSong("spotify:track:1UgdmAI4kslg1v8LTcHHnK");
			nile.addSong("spotify:track:2iImmxiSjJrBfN72N9qcrF");
			nile.addSong("spotify:track:180HA6yx4R67xfQe7854C9");
			Thread.sleep(5000);
			nile.addSong("spotify:track:7DCKBlYj3EE929GLVQy64a");
			nile.addSong("spotify:track:6sw35gpX4jociv3lbI5uXi");
			nile.addSong("spotify:track:1KFbAxV9AHHrq3UwVVovuZ");
			nile.addSong("spotify:track:7CbBrCLAbeF3sDq1XUYG5k");
			playlists.put("nile", nile);
			Thread.sleep(5000);
		} catch (Exception u) {
			LOGGER.debug(u);
		}
	}

	public boolean playlistExists(String playlistId) {
		return playlists.get(playlistId) != null;
	}

	public String createPlaylist(String id) {

		LOGGER.debug("Creating playlist with id: " + id
				+ ". These are the current playlists: " + playlists);
		playlists.put(id, new Playlist(userService, restService, id));
		return id;
	}

	public LinkedList<SongBean> getSongs(String playlistId) {
		return playlists.get(playlistId).getSongs();
	}

	public Map<String, SongBean> getScores(String playlistId) {
		return playlists.get(playlistId).getScores();
	}

	public boolean addSong(String playlistId, String uri) {
		return playlists.get(playlistId).addSong(uri);
	}

	public SongBean getPlayingSong(String playlistId) {
		return playlists.get(playlistId).getPlayingSong();
	}

	public boolean addPointToSong(String playlistId, String uri) {
		return playlists.get(playlistId).addPointToSong(uri);
	}

	public String getLeadingSongAndResetScore(String playlistId) {
		return playlists.get(playlistId).getLeadingSongAndResetScore();
	}

	public String getLeadingSong(String playlistId) {
		return playlists.get(playlistId).getLeadingSong();
	}
}
