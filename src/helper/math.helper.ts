export default class MathHelper {
  /**
   * Get a random percentage number, like 0.5, 0.86, etc.
   * @param includeZero, if true, 0 can be returned, otherwise, 0 will be converted to 1 and returned.
   * @returns A random percentage number.
   */
  static getRandomPercentage(includeZero = false): number {
    const percentage = Math.round(Math.random() * 100) / 100;

    return includeZero ? percentage : percentage || 1;
  }

  /**
   * Get a random less or equal to the max number.
   * @param includeZero, if true, 0 can be returned, otherwise, 0 will be converted to the max number and returned.
   * @returns A random number.
   */
  static getRandomNumber(max: number, includeZero = false): number {
    return Math.round(max * MathHelper.getRandomPercentage(includeZero));
  }
}
