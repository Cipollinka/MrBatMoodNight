package com.mr_bat.audio;

import android.media.MediaPlayer;
import android.util.SparseArray;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;

public class AudioModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private final SparseArray<MediaPlayer> players;
    private int nextId = 1;

    public AudioModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.players = new SparseArray<>();
    }

    @Override
    public String getName() {
        return "AudioModule";
    }

    @ReactMethod
    public void initialize(Promise promise) {
        try {
            // Clear any existing players
            for (int i = 0; i < players.size(); i++) {
                MediaPlayer player = players.valueAt(i);
                if (player != null) {
                    player.release();
                }
            }
            players.clear();
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("INIT_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void loadSound(String fileName, Promise promise) {
        try {
            String assetPath = "audio/" + fileName;
            MediaPlayer player = new MediaPlayer();
            player.setDataSource(reactContext.getAssets().openFd(assetPath));
            player.prepare();
            
            int id = nextId++;
            players.put(id, player);
            promise.resolve(id);
        } catch (IOException e) {
            promise.reject("LOAD_ERROR", "Failed to load sound: " + e.getMessage());
        }
    }

    @ReactMethod
    public void playSound(int soundId, Promise promise) {
        MediaPlayer player = players.get(soundId);
        if (player != null) {
            try {
                player.start();
                promise.resolve(null);
            } catch (IllegalStateException e) {
                promise.reject("PLAY_ERROR", e.getMessage());
            }
        } else {
            promise.reject("INVALID_ID", "Sound ID not found");
        }
    }

    @ReactMethod
    public void pauseSound(int soundId, Promise promise) {
        MediaPlayer player = players.get(soundId);
        if (player != null) {
            try {
                player.pause();
                promise.resolve(null);
            } catch (IllegalStateException e) {
                promise.reject("PAUSE_ERROR", e.getMessage());
            }
        } else {
            promise.reject("INVALID_ID", "Sound ID not found");
        }
    }

    @ReactMethod
    public void stopSound(int soundId, Promise promise) {
        MediaPlayer player = players.get(soundId);
        if (player != null) {
            try {
                player.stop();
                player.prepare();
                promise.resolve(null);
            } catch (Exception e) {
                promise.reject("STOP_ERROR", e.getMessage());
            }
        } else {
            promise.reject("INVALID_ID", "Sound ID not found");
        }
    }

    @ReactMethod
    public void releaseSound(int soundId, Promise promise) {
        MediaPlayer player = players.get(soundId);
        if (player != null) {
            player.release();
            players.remove(soundId);
            promise.resolve(null);
        } else {
            promise.reject("INVALID_ID", "Sound ID not found");
        }
    }

    @ReactMethod
    public void setVolume(int soundId, float volume, Promise promise) {
        MediaPlayer player = players.get(soundId);
        if (player != null) {
            try {
                player.setVolume(volume, volume);
                promise.resolve(null);
            } catch (IllegalStateException e) {
                promise.reject("VOLUME_ERROR", e.getMessage());
            }
        } else {
            promise.reject("INVALID_ID", "Sound ID not found");
        }
    }

    @ReactMethod
    public void getCurrentTime(int soundId, Promise promise) {
        MediaPlayer player = players.get(soundId);
        if (player != null) {
            try {
                int currentPosition = player.getCurrentPosition();
                promise.resolve(currentPosition / 1000.0);
            } catch (IllegalStateException e) {
                promise.reject("TIME_ERROR", e.getMessage());
            }
        } else {
            promise.reject("INVALID_ID", "Sound ID not found");
        }
    }
}