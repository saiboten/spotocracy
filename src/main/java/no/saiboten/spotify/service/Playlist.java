package no.saiboten.spotify.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import no.saiboten.spotify.bean.SongBean;

import org.apache.log4j.Logger;

public class Playlist {

	private SongBean currentSong = null;

	private Map<String, SongBean> scores = new HashMap<String, SongBean>();

	private LinkedList<SongBean> songs = new LinkedList<SongBean>();

	private final Logger LOGGER = Logger.getLogger(getClass());

	private UserService userService;

	private SpotifySongRestService restService;

	private String playlistId;

	public Playlist(UserService userService,
			SpotifySongRestService restService, String playlistId) {
		this.userService = userService;
		this.restService = restService;
		this.playlistId = playlistId;

		// addInitialSongs();
	}

	public LinkedList<SongBean> getSongs() {
		return songs;
	}

	public Map<String, SongBean> getScores() {
		return scores;
	}

	private void bubbleSongs() {
		int thisValue = -1;
		int previousValue = -1;

		for (int i = songs.size() - 1; i >= 0; i--) {
			thisValue = songs.get(i).getScore();

			if (previousValue == -1) {
				// Do nothing?
			} else {
				if (previousValue > thisValue) {
					LOGGER.debug("Swaptime!");
					SongBean demotableSong = songs.get(i + 1);
					songs.set(i + 1, songs.get(i));
					songs.set(i, demotableSong);
				}
			}

			previousValue = songs.get(i).getScore();
		}
	}

	private void addInitialSongs() {
		SongBean cityBoy = new SongBean();
		cityBoy.setAlbum("Some Album");
		cityBoy.setUri("spotify:track:6GvK6rE2tkOduwnJgJMjcy");
		cityBoy.setArtist("Donkeyboy");
		cityBoy.setSong("City Boy");
		scores.put("spotify:track:6GvK6rE2tkOduwnJgJMjcy", cityBoy);
		songs.add(cityBoy);

		SongBean mouthOfKala = new SongBean();
		mouthOfKala.setAlbum("L'enfant Souvage");
		mouthOfKala.setUri("spotify:track:3YVwGFmSc1ycqsk6qLNAK3");
		mouthOfKala.setArtist("Gojira");
		mouthOfKala.setSong("Mouth of Kala");
		scores.put("spotify:track:3YVwGFmSc1ycqsk6qLNAK3", mouthOfKala);
		songs.add(mouthOfKala);
	}

	public boolean addSong(String uri) {
		boolean success = true;
		SongBean songBean = restService.getSongFromUri(uri);
		if (songBean == null) {
			success = false;
		} else {
			success = true;
			scores.put(uri, songBean);
			songs.addLast(songBean);
		}

		return success;
	}

	public boolean addPointToSong(String uri) {
		SongBean songBean = scores.get(uri);
		LOGGER.debug("Songbean: " + songBean);
		if (songBean == null) {
			LOGGER.warn("This song doesn't exist? Can't add to non-existing song. Uri was: "
					+ uri);
			return false;
		} else {
			LOGGER.debug("Incrementing value for song: " + songBean);
			songBean.setScore(songBean.getScore() + 1);
			bubbleSongs();
			return true;
		}
	}

	public String getLeadingSongAndResetScore() {
		LOGGER.debug("Finding best song.");
		SongBean bestSong = songs.getFirst();

		if (bestSong != null) {
			LOGGER.debug("Best song was " + bestSong + ". Clearing value.");
			userService.clearSong(playlistId, bestSong.getUri());
			bestSong.setScore(0);
			songs.remove(bestSong);
			songs.addLast(bestSong);
			currentSong = bestSong;
			return bestSong.getUri();
		}
		LOGGER.warn("No best song found. Weird!");
		return null;
	}

	public SongBean getPlayingSong() {
		return currentSong;
	}

	public String getLeadingSong() {
		LOGGER.debug("Finding best song.");
		SongBean bestSong = songs.getFirst();
		if (bestSong != null) {
			LOGGER.debug("This was the best song: " + songs.getFirst());
			return songs.getFirst().getUri();
		}
		LOGGER.debug("No best sound found. Weird! The song list is empty? "
				+ songs);
		return null;
	}

}
