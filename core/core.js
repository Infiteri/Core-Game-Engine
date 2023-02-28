import { Camera } from './camera/Camera.js'
import { OrthographicCamera } from './camera/OrthographicCamera.js'
import { PerspectiveCamera } from './camera/PerspectiveCamera.js'
import { CoreApp } from './core/CoreApp.js'
import { Engine } from './core/Engine.js'
import { Window } from './core/Window.js'
import { Keyboard } from './events/Keyboard.js'
import { Mouse } from './events/Mouse.js'
import { BoxGeometry } from './geometries/BoxGeometry.js'
import {
  AssetManager,
  IAsset,
  IAssetLoader,
  messages,
} from './global/assets/AssetManager.js'

import { ImageAssetLoader } from './global/assets/ImageAssetLoader.js'
import {
  IMessageHandler,
  Message,
  MessagePriority,
} from './global/messages/Message.js'
import { MessageBus } from './global/messages/MessageBus.js'
import { Layer } from './layer/Layer.js'
import { LayerStack } from './layer/LayerStack.js'
import { ShaderManager } from './manager/ShaderManager.js'
import { ColorMaterial } from './materials/ColorMaterial.js'
import { Matrix4x4 } from './math/Matrix4x4.js'
import { Transform } from './math/Transform.js'
import { Vector3 } from './math/Vector3.js'
import { Mesh } from './objects/Mesh.js'
import { RenderBatch } from './render/RenderBatch.js'
import { MeshComponent } from './scene/components/MeshComponent.js'
import { Entity } from './scene/Entity.js'
import { Scene } from './scene/Scene.js'
import { SceneManager } from './scene/SceneManager.js'
import { Buffer, Attribute } from './webgl/Buffer.js'
import { Color } from './webgl/Color.js'
import { Shader } from './webgl/Shader.js'
import { ColorShader } from './webgl/shaders/ColorShader.js'
import { Texture } from './webgl/Texture.js'

//GL Context
export const gl = document.querySelector('canvas').getContext('webgl')

const core = {
  //Core classes
  CoreApp,
  Engine,
  Window,
  Keyboard,
  Mouse,

  //Cameras
  Camera,
  OrthographicCamera,
  PerspectiveCamera,

  //Layers
  Layer,
  LayerStack,

  //Assets
  AssetManager,
  IAsset,
  IAssetLoader,

  //Messages
  IMessageHandler,
  Message,
  MessageBus,
  messages,
  MessagePriority,
  ImageAssetLoader,

  //GL
  Shader,
  Color,
  Buffer,
  Attribute,
  Texture,

  ///Materials
  ColorMaterial,

  //Math related class
  Transform,
  Matrix4x4,
  Vector3,

  //Managers
  ShaderManager,
  SceneManager,

  //Shaders
  ColorShader,

  //Debugs info if true
  debugLog: true,

  // Objects
  Mesh,

  //Geo
  BoxGeometry,

  //Renderer
  RenderBatch,

  //Scene
  Entity,
  MeshComponent,
  Scene,
}

export default core
