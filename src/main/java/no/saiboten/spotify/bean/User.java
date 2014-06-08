package no.saiboten.spotify.bean;

import java.util.HashMap;
import java.util.Map;

public class User {
	@Override
	public String toString() {
		return "User [id=" + id + ", votes=" + votes + "]";
	}

	private String id;
	private Map<String, Boolean> votes;
	private int availableVotes = 5;

	public int getAvailableVotes() {
		return availableVotes;
	}

	public void setAvailableVote(int availableVote) {
		this.availableVotes = availableVote;
	}

	public User() {
		votes = new HashMap<String, Boolean>();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public boolean hasVoted(String songUri) {
		Boolean b = votes.get(songUri);

		System.out.println("Has user voted? " + b);

		if (b == null) {
			b = false;
		}
		return b;
	}

	public void vote(String songUri) {
		System.out.println("adding vote: " + songUri);
		votes.put(songUri, true);
		setAvailableVote(getAvailableVotes() - 1);
	}

	public void clearVote(String songUri) {
		System.out.println("Clearing vote: " + songUri);
		votes.put(songUri, false);
	}

	public boolean isOutOfVotes() {
		return getAvailableVotes() <= 0;
	}

}
