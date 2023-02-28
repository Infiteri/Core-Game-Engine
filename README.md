# Core Game Engine:

    A small little game engine made fully by myself for fun

    I have learned a lot of stuff on the way.

# Core Folder Structure:

    Every file besides core.js is in its own folder nice and organized

> Folders and its content / descriptions:

# Camera Folder:

    Home for the orthographic camera, perspective (Must fix) camera, and a base camera class

> Camera/Camera.js: Main base for all the cameras

> Camera/OrthographicCamera.js: 2D Camera class

> Camera/PerspectiveCamera.js: 3D (In work) Camera class

# Core Folder:

    Home for the engine class, A core app template and the window

> Core/CoreApp.js: Template for apps that use my engine; It has a instance of the engine:

`
class Application extends core.CoreApp {
constructor(name) {
super(name);
}
}

`
