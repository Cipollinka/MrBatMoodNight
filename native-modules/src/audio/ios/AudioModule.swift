import Foundation
import AVFoundation

@objc(AudioModule)
class AudioModule: NSObject {
    private var audioPlayers: [Int: AVAudioPlayer] = [:]
    private var nextSoundId: Int = 1
    
    @objc
    func initialize(_ resolve: @escaping RCTPromiseResolveBlock,
                    reject: @escaping RCTPromiseRejectBlock) {
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback)
            try AVAudioSession.sharedInstance().setActive(true)
            resolve(nil)
        } catch {
            reject("INIT_ERROR", error.localizedDescription, error)
        }
    }
    
    @objc
    func loadSound(_ fileName: String,
                   resolve: @escaping RCTPromiseResolveBlock,
                   reject: @escaping RCTPromiseRejectBlock) {
        guard let url = Bundle.main.url(forResource: fileName, withExtension: nil) else {
            reject("FILE_NOT_FOUND", "Could not find audio file: \(fileName)", nil)
            return
        }
        
        do {
            let player = try AVAudioPlayer(contentsOf: url)
            player.prepareToPlay()
            let soundId = nextSoundId
            audioPlayers[soundId] = player
            nextSoundId += 1
            resolve(soundId)
        } catch {
            reject("LOAD_ERROR", error.localizedDescription, error)
        }
    }
    
    @objc
    func playSound(_ soundId: NSNumber,
                   resolve: @escaping RCTPromiseResolveBlock,
                   reject: @escaping RCTPromiseRejectBlock) {
        guard let player = audioPlayers[soundId.intValue] else {
            reject("INVALID_SOUND_ID", "No sound loaded for id: \(soundId)", nil)
            return
        }
        
        player.play()
        resolve(nil)
    }
    
    @objc
    func pauseSound(_ soundId: NSNumber,
                    resolve: @escaping RCTPromiseResolveBlock,
                    reject: @escaping RCTPromiseRejectBlock) {
        guard let player = audioPlayers[soundId.intValue] else {
            reject("INVALID_SOUND_ID", "No sound loaded for id: \(soundId)", nil)
            return
        }
        
        player.pause()
        resolve(nil)
    }
    
    @objc
    func stopSound(_ soundId: NSNumber,
                   resolve: @escaping RCTPromiseResolveBlock,
                   reject: @escaping RCTPromiseRejectBlock) {
        guard let player = audioPlayers[soundId.intValue] else {
            reject("INVALID_SOUND_ID", "No sound loaded for id: \(soundId)", nil)
            return
        }
        
        player.stop()
        player.currentTime = 0
        resolve(nil)
    }
    
    @objc
    func releaseSound(_ soundId: NSNumber,
                      resolve: @escaping RCTPromiseResolveBlock,
                      reject: @escaping RCTPromiseRejectBlock) {
        audioPlayers.removeValue(forKey: soundId.intValue)
        resolve(nil)
    }
    
    @objc
    func setVolume(_ soundId: NSNumber,
                   volume: NSNumber,
                   resolve: @escaping RCTPromiseResolveBlock,
                   reject: @escaping RCTPromiseRejectBlock) {
        guard let player = audioPlayers[soundId.intValue] else {
            reject("INVALID_SOUND_ID", "No sound loaded for id: \(soundId)", nil)
            return
        }
        
        player.volume = volume.floatValue
        resolve(nil)
    }
    
    @objc
    func getCurrentTime(_ soundId: NSNumber,
                        resolve: @escaping RCTPromiseResolveBlock,
                        reject: @escaping RCTPromiseRejectBlock) {
        guard let player = audioPlayers[soundId.intValue] else {
            reject("INVALID_SOUND_ID", "No sound loaded for id: \(soundId)", nil)
            return
        }
        
        resolve(player.currentTime)
    }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
}