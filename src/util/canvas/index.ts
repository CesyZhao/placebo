import { IAnimation } from "./types"

import { Glob, IGlobOptions } from "./animations/Glob";

export class Wave {
    public animations = {
        "Glob": Glob,
    };
    private _activeAnimations: IAnimation[] = [];
    private _canvasContext: CanvasRenderingContext2D;
    private _player: any;

    constructor(player: any, canvasContext: CanvasRenderingContext2D) {
        this._player = player;
        this._canvasContext = canvasContext;
        this._draw();
    }

    private _draw(): void {

        let tick = () => {
            const data = this._player.getAudioData();
            this._canvasContext.clearRect(0, 0, this._canvasContext.canvas.width, this._canvasContext.canvas.height);
            this._activeAnimations.forEach((animation) => {
                animation.draw(data, this._canvasContext);
            })
            window.requestAnimationFrame(tick);
        }
        tick();
    }

    public addAnimation(animation: IAnimation): void {
        this._activeAnimations.push(animation);
    }

    public clearAnimations(): void {
        this._activeAnimations = [];
    }
}