
export const isDaytime = (weather) => {
    const currentTime = new Date().getTime() / 1000;
    return weather && currentTime > weather.sys.sunrise && currentTime < weather.sys.sunset;
}