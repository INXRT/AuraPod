// Sound synthesis completely disabled per project specification
class SoundEngine {
  public toggleSound(): boolean {
    return false;
  }

  public isEnabled(): boolean {
    return false;
  }

  public playToggleClick(): void {
    // Silent
  }

  public playRadarChirp(_intensity: number = 1.0): void {
    // Silent
  }

  public playSuccessChime(): void {
    // Silent
  }

  public playErrorAlarm(): void {
    // Silent
  }
}

export const sound = new SoundEngine();
