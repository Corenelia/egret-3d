﻿module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleVelocityForceConstNode(常量部分)
    * @classdesc
    * 粒子加速度效果节点
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleVelocityForceConstNode extends AnimationNode {

        /**
        * @private
        */
        private _node: ParticleDataMoveSpeed;
        private _forceValue: Vec3ConstRandomValueShape;
        private attribute_accelerationSpeed: GLSL.VarRegister;
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }


        /**
       * @language zh_CN
       * 填充粒子加速度数据
       * @param data ParticleDataNode 粒子数据来源
       * @version Egret 3.0
       * @platform Web,Native
       */
        public initNode(data: ParticleDataNode): void {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }


        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public build(geometry: Geometry, count: number) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }


    }
} 