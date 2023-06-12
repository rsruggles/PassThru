# PassThru - A/V Capture and Passthrough

PassThru is a web application wrapped in Electron that allows you to choose the Video and Audio Input Source and displays it in a clean and optimized window. With PassThru, you have full control over the aspect ratio, frame rate, input sources, and window behavior. You can easily lock or unlock the aspect ratio, change the FPS, switch between different devices as the input source, toggle between fullscreen and maximize or minimize the window, and freely drag the window around your screen.

## Features

- Choose Video and Audio Input Source
- Clean and optimized window UI
- Lock/unlock aspect ratio
- Change the FPS (frame rate)
- Switch between different input devices
- Fullscreen/maximize or minimize the window
- Drag the window anywhere on your screen

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

PassThru is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License.

## Author

PassThru is developed and maintained by Rian Scott.
