### Collaborative music maker social media
- A user picks a set of sounds and creates a clip of maximum 4 bars (Option to do 1, 2, or 4)
- A following user gets access to the same sounds as well as any other additional ones they might want but the key and tempo is already set by the initial user. They can add next to it for a maximum of 4 bars. They also have the option to duplicate any of the previous tracks and modify to personalize.
- All of the clips are created by a sequencer. Therefore, there is a limited amount of sounds and a timer that goes through and the users can pencil in the places where there would be a sound.
- Any duplicated clip gets the name of the new owner and gets added to the end of the song.
While a user is adding to the song, they have the option to start the song's previous 4 bars and go into their creation or to start the song from the beginning and go into their creation
- Each initial user gives their song a tag for: type, key, tempo and topic of the song. This makes it easier for a user to find songs that they can collaborate in that are interesting to them.
- Each initial user has the right to delete any new clips that were added to their song as long as they give a valid justification for it. ? Maybe?
- Each user has a username, password, initiations, collaborations, reactions to certain clips (and followers?)
- Each clip has: music content, reactions from other users
- A prototype of our user interface can be found in this invision sketch. 

### Other similar ideas and how ours is different
- https://github.com/eacoeytaux/cs4241-fp
	- It is not collaborative
	- You can only use the pentatonic scale
- https://www.kompoz.com/music/
	- You cannot make the song on the platform, an external software such as Logic or Ableton Live have to be used to create the song and then it gets uploaded to the platform
- https://www.bandhub.com/
	- It focuses on audio , recording on top of other people’s sounds. Our app will only support MIDI and creation on the platform. 

### Technologies we plan to use 
- Frontend: React
- Server: Express
- Database: PostgreSQL + some way of storing audio/midi information (Firebase?)

### Tables
- A more specific diagram of our ideated database can be found here. 
- **Users:**

id | name | username      | email
------- | ---------------- | ---------- | ---------
8  | lane harisson | lharisson | lharisson@gmail.com

- **Tracks:**

 sid (song id) | conid (contributor id) | tracknumber (position in the song where this specific track goes) |midi (contains the midi sound recording)
------- | ---------------- | ---------- | ---------
 6 | 8 | 1 | store midi somehow

- In this table, we will differentiate the original creators from the contributors using the `tracknumber`. If the `tracknumber` is 1, then we look at the `conid` and match that with the corresponding user in the users table

### Questions we have
- Is our idea doable in 2 weeks?
- Is our idea innovative enough for the scope of this project?
- If neither of us have experience using Firebase, would it be realistic to try to use Firebase to be able to store audio and have a “serverless” application, or is this too complicated?
- Follow up: what could we use to store the midi that is made on the platform?
- Would you recommend a different structure for the tables, or are we on the right track?
