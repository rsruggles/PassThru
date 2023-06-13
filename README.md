# PassThru - A/V Capture and Passthrough

PassThru is a web application built with Electron. It allows you to choose from your Video and Audio input sources and display a passthrouh output in a clean and optimized window. PassThru provides many options including frame rate, input sources, resolution and window resize behavior.

Being a software solution, PassThru might introduce some latency, but that seems pretty dependant on hardware setups. I use it to dock my switch with a PICE capture card and don't have a noticable amount of latency, but your mileage may vary.

## Features

- Choose Video and Audio Input Source
- Clean and optimized window UI
- Change the FPS (frame rate)
- Switch between different input devices
- Fullscreen/maximize or minimize the window
- Change input resolution (only 16:9 for now)
- Fill, Contain, or down-scale video image

## Dependencies

To run PassThru, you need the following dependencies:

- Electron: ^25.0.1
- Electron Builder: ^23.6.0

## Project Setup and Start Guide

To set up and start PassThru, follow these steps:

1. Clone the PassThru repository from GitHub.
2. Make sure you have Node.js and npm (Node Package Manager) installed on your system.
3. Open a terminal or command prompt and navigate to the project directory.
4. Run the following command to install the project dependencies:
```
npm install
```
5. After the dependencies are installed, run the following command to start PassThru:
```
npm start
```

PassThru will launch, and you can start using it to capture and passthrough audio and video.

## How to Compile

If you want to compile PassThru into an executable application, you can use Electron Builder. Follow these steps:

1. Ensure you have completed the project setup steps mentioned above.
2. Run the following command to compile PassThru for your target platform:

```
npm run build
```
This command will create an executable file for your platform in the `dist` directory.

Thats it! You have successfully compiled PassThru into an executable application for your platform.

## License

PassThru is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## Author

PassThru is developed and maintained by [rsruggles](https://github.com/rsruggles).
