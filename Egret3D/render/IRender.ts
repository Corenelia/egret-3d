﻿module egret3d {

    /**
    * @class egret3d.IRender
    * @classdesc
    * 场景中的可见物体，可渲染的对象。
    * 在渲染之前会将渲染树中对象进行筛选.
    * 只有IRender对象才会进入渲染管线
    * @see egret3d.Object3D
    * @see egret3d.Geometry
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class IRender extends Object3D {


        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
        }

        /**
        * @language zh_CN
        * 网格信息。</p>
        * geometry 为渲染对象的网格信息 ，渲染对象需要 vertexBuffer  和 indexBuffer 信息 及顶点着色器shade。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected _geometry: Geometry;

        public get geometry(): Geometry {
            return this._geometry;
        }

        public set geometry(value: Geometry) {
            if (this._geometry == value) {
                return;
            }
            if (value) {
                value.incRef();
            }
            if (this._geometry) {
                this._geometry.dispose();
            }
            this._geometry = value;
        }

        /**
        * @language zh_CN
        * 对象类型。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: string = "";

        /**
        * @language zh_CN
        * 渲染排序的参数，数值越大，先渲染</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get drawOrder(): number {
            return 0;
        }

        /**
        * @language zh_CN
        * 材质信息。</p>
        * 赋予对象节点可供渲染的材质球属性，让对象加入可渲染实体列表，及渲染对象与对象之间的混合，排序。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected _material: MaterialBase;

        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected _multiMaterial: { [matID: number]: MaterialBase } = {};

        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected _materialCount: number = 0;

        /**
        * @language zh_CN
        * 动作对象，控制骨骼动画/特效动画等。</p>
        * 可拓展的动画功能属性，动画功能的驱动类总接口。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animation: IAnimation = null;

        /**
        * @language zh_CN
        * 材质球收到光照影响的灯光组，如果需要动态添加删除灯光的，一定要注意时实性
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected _lightGroup: LightGroup;

        /**
        * @language zh_CN
        * 设置材质 lightGroup 。
        * 设置材质球接受的灯光组。
        * @param lightGroup LightGroup
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set lightGroup(lightGroup: LightGroup) {
            this._lightGroup = lightGroup;
            for (var id in this.multiMaterial) {
                this.multiMaterial[id].lightGroup = this._lightGroup;
            }
        }

        /**
        * @language zh_CN
        * 获取材质 lightGroup 。
        * @returns LightGroup 灯光组
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get lightGroup(): LightGroup {
            return this._lightGroup;
        }

        /**
        * @language zh_CN
        * 增加一个材质
        * @param id 材质id
        * @param material 模型材质
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addSubMaterial(id: number, material: MaterialBase) {
            if (!this._multiMaterial[id]) {
                this._materialCount++;
            }
            this.setSubMaterial(id, material);
        }

        /**
        * @language zh_CN
        * 设置材质
        * @param id 材质id
        * @param material 模型材质
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setSubMaterial(id: number, material: MaterialBase) {
            this._multiMaterial[id] = material;
            if (!material) {
                this.removeSubMaterial(id);
            }
            if (id == 0) {
                this._material = material;
            }
            if (material) {
                material.lightGroup = this._lightGroup;
            }
        }

        /**
        * @language zh_CN
        * 删除一个材质
        * @param id 材质id
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeSubMaterial(id: number) {
            if (this._multiMaterial[id]) {
                delete this._multiMaterial[id];
                this._materialCount--;
            }
        }

        /**
        * @language zh_CN
        * 用ID得到一个材质
        * @param id 材质id
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getMaterial(id: number): MaterialBase {
            return this._multiMaterial[id];
        }

        /**
        * @language zh_CN
        * 得到所有材质的个数
        * @returns number
        * @version Egret 3.0
        * @platform Web,Native
        */
        public materialCount(): number {
            return this._materialCount;
        }

        /**
        * @language zh_CN
        * 获取材质
        * @returns MaterialBase 材质
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get material(): MaterialBase {
            return this._material;
        }

        /**
        * @language zh_CN
        * 设置材质
        * @param mat 材质
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set material(mat: MaterialBase) {
            this._material = mat;
            if (this._multiMaterial[0]) {
                this.setSubMaterial(0, mat);
            }
            else {
                this.addSubMaterial(0, mat);
            }
        }

        /**
        * @language zh_CN
        * 获取多材质
        * @returns { [matID: number]: MaterialBase } 多个材质
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get multiMaterial(): { [matID: number]: MaterialBase } {
            return this._multiMaterial;
        }

        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);

            if (this.animation) {
                this.animation.update(time, delay, this.geometry);
            }
            if (this.geometry.subGeometrys.length <= 0) {
                this.geometry.buildDefaultSubGeometry();
            }
        }

        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose() {
            super.dispose();
            if (this._bound) {
                this._bound.dispose();
                this._bound = null;
            }
            this.geometry = null;

            //for (var key in this.multiMaterial) {
            //    this.multiMaterial[key].dispose();
            //}
            this.multiMaterial = {};
        }
    }
}