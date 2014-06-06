package no.saiboten.spotify.bean;

public class SongBean {
	private String uri;
	private String artist;
	private int score;

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public String getAlbum() {
		return album;
	}

	public void setAlbum(String album) {
		this.album = album;
	}

	private String song;
	private String album;

	public String getUri() {
		return uri;
	}

	@Override
	public String toString() {
		return "SongBean [uri=" + uri + ", artist=" + artist + ", score="
				+ score + ", song=" + song + ", album=" + album + "]";
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getSong() {
		return song;
	}

	public void setSong(String song) {
		this.song = song;
	}
}
