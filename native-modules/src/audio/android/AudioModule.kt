package com.mr_bat.audio

import android.media.MediaPlayer
import com.facebook.react.bridge.*
import java.io.IOException

class AudioModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val audioPlayers = mutableMapOf<Int, MediaPlayer>()
    private var nextSoundId = 1

    override fun getName() = "AudioModule"

    @ReactMethod
    fun initialize(promise: Promise) {
        try {
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("INIT_ERROR", e)
        }
    }

    @ReactMethod
    fun loadSound(fileName: String, promise: Promise) {
        try {
            val resourceId = reactApplicationContext.resources.getIdentifier(
                fileName.substringBeforeLast("."),
                "raw",
                reactApplicationContext.packageName
            )

            if (resourceId == 0) {
                throw IOException("Resource not found: $fileName")
            }

            val player = MediaPlayer.create(reactApplicationContext, resourceId)
            val soundId = nextSoundId++
            audioPlayers[soundId] = player
            promise.resolve(soundId)
        } catch (e: Exception) {
            promise.reject("LOAD_ERROR", e)
        }
    }

    @ReactMethod
    fun playSound(soundId: Int, promise: Promise) {
        try {
            val player = getPlayer(soundId)
            player.start()
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("PLAY_ERROR", e)
        }
    }

    @ReactMethod
    fun pauseSound(soundId: Int, promise: Promise) {
        try {
            val player = getPlayer(soundId)
            player.pause()
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("PAUSE_ERROR", e)
        }
    }

    @ReactMethod
    fun stopSound(soundId: Int, promise: Promise) {
        try {
            val player = getPlayer(soundId)
            player.stop()
            player.prepare()
            player.seekTo(0)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("STOP_ERROR", e)
        }
    }

    @ReactMethod
    fun releaseSound(soundId: Int, promise: Promise) {
        try {
            val player = audioPlayers.remove(soundId)
            player?.release()
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("RELEASE_ERROR", e)
        }
    }

    @ReactMethod
    fun setVolume(soundId: Int, volume: Float, promise: Promise) {
        try {
            val player = getPlayer(soundId)
            player.setVolume(volume, volume)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("VOLUME_ERROR", e)
        }
    }

    @ReactMethod
    fun getCurrentTime(soundId: Int, promise: Promise) {
        try {
            val player = getPlayer(soundId)
            promise.resolve(player.currentPosition / 1000.0)
        } catch (e: Exception) {
            promise.reject("TIME_ERROR", e)
        }
    }

    private fun getPlayer(soundId: Int): MediaPlayer {
        return audioPlayers[soundId] ?: throw IllegalArgumentException("Invalid sound ID: $soundId")
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        audioPlayers.values.forEach { it.release() }
        audioPlayers.clear()
    }
}