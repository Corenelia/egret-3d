﻿module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Billboard
     * @classdesc
     * 公告板渲染对象 始终面朝摄像机的面板
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Billboard extends Mesh{

        private width: number; 
        private height: number; 
        private planeGeometry: PlaneGeometry; 
        /**
         * @language zh_CN
         * 指定材质，和公告板宽、高，构建一个公告板
         * @param material 渲染材质
         * @param geometry 几何数据，默认参数为null 为null会在内部创建一个PlaneGeometry  自定义PlaneGeometry的时候 请注意创建面的朝向
         * @param width 公告板宽度 默认参数为 100
         * @param height 公告板高度 默认参数为 100
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(material: MaterialBase, geometry: Geometry = null, width: number = 100, height: number = 100) {
            if (geometry == null) {
                geometry = new PlaneGeometry(width, height, 1, 1, 1, 1, Vector3D.Z_AXIS);
            }
            super(geometry, material);

            this.planeGeometry = <PlaneGeometry>this.geometry;

            this.width = width; 
            if (!this.bound) {
                this.bound = this.buildBoundBox();
            }
        }

        /**
        * @language zh_CN
        * 数据更新，不前对象的旋转和摄像机的旋转一致
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
            this.globalOrientation = camera.globalOrientation;
        }

        public clone(): Mesh {
            var ani: IAnimation = null;
            if (this.animation) {
                ani = this.animation.clone();
            }
            var cloneMesh: Billboard = new Billboard(this.material, this.geometry, this.planeGeometry.width, this.planeGeometry.height );
            cloneMesh.multiMaterial = this.multiMaterial;
            return cloneMesh;
        }
    }
}