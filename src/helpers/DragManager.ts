import { DisplayObject, Point, Container, Rectangle } from 'pixi.js';

const MIN_DRAG = 10;

/**
 * DragManager - encapsulates drag/sticky-click functionality
 * 
 * requires update() function to be called in render loop.
 * 
 * TODO: may depend on scene and draggableContainer having matching coordinate spaces.
 */
export default class DragManager{

    private selectedObject:DisplayObject;
    private mousePosition = new Point();
    private dragStartPosition = new Point();
    private objectStartPosition = new Point();
    private isSticky = false;
    private isDragging = false;
    private awaitingAction = false;

    private scene:DisplayObject;
    private draggableContainer:Container;
    private onEndDrag:(object:DisplayObject)=>any;
    private onStickySelect:(object:DisplayObject)=>any;
    private onStartDrag:(object:DisplayObject)=>any;

    private objects:DisplayObject[] = [];

    public bounds:Rectangle;


    constructor(scene:DisplayObject, draggableContainer:Container, dragBounds?:Rectangle, onStartDrag?:(object:DisplayObject)=>any, onEndDrag?:(object:DisplayObject)=>any, onStickySelect?:(object:DisplayObject)=>any){
        this.scene = scene;
        this.draggableContainer = draggableContainer;
        this.bounds = dragBounds || this.draggableContainer.getBounds();
        this.onStartDrag = onStartDrag;
        this.onEndDrag = onEndDrag;
        this.onStickySelect = onStickySelect;
        this.scene.on('pointermove', this.updateMousePosition);
    }

    public addObject(object:DisplayObject){
        object.interactive = true;
        object.cursor = 'pointer';
        object.on('pointerdown', this.draggableDown);
        this.objects.push(object);
    }
    public removeObject(object:DisplayObject){
        object.interactive = false;
        object.cursor = 'normal';
        object.off('pointerdown', this.draggableDown);
        const index = this.objects.indexOf(object);
        if(index >= 0){
            this.objects.splice(index, 1);
        }
        if(this.selectedObject === object){
            this.isSticky = false;
            this.isDragging = false;
            this.selectedObject = null;
        }
    }

    private draggableDown = (ev:PIXI.interaction.InteractionEvent)=>{
        (ev.data as any).didAction = true;
        ev.data.originalEvent.preventDefault();
        if(!ev.data.isPrimary){
            return;
        }
        this.scene.off('pointerdown', this.draggableDown);
        if(this.selectedObject && this.selectedObject !== ev.target){
            this.endDrag(ev);
        }
        else{
            this.selectedObject = ev.target;
            if(!this.isSticky){
                this.awaitingAction = true;
                if(this.onStartDrag){
                    this.onStartDrag(this.selectedObject);
                }
            }
            this.draggableContainer.addChild(this.selectedObject);
            ev.data.getLocalPosition(this.scene, this.dragStartPosition);
            this.objectStartPosition.copy(this.selectedObject.position);
            this.scene.off('pointerup', this.draggableUp);
            this.scene.once('pointerup', this.draggableUp);
            this.updateMousePosition(ev);
        }
    }
    
    private draggableUp = (ev:PIXI.interaction.InteractionEvent) => {
        (ev.data as any).didAction = true;
        if(!ev.data.isPrimary){
            this.scene.once('pointerup', this.draggableUp);
            return;
        }
        if(!this.selectedObject){
            this.updateMousePosition(ev);
            return;
        }
        if(this.awaitingAction){
            this.awaitingAction = false;
            this.isSticky = true;
            this.scene.once('pointerdown', this.draggableDown);
            this.updateMousePosition(ev);
            if(this.onStickySelect){
                this.onStickySelect(this.selectedObject);
            }
        }
        else{
            this.updateMousePosition(ev);
            this.endDrag(ev);
        }
    }

    private endDrag = (ev:PIXI.interaction.InteractionEvent) => {
        this.isSticky = false;
        this.isDragging = false;
        this.updateMousePosition(ev);
        this.update();
        if(this.onEndDrag){
            this.onEndDrag(this.selectedObject);
        }
        this.selectedObject = null;
    }

    private updateMousePosition = (ev:PIXI.interaction.InteractionEvent)=>{
        ev.data.originalEvent.preventDefault();
        if(!ev.data.isPrimary){
            return;
        }
        ev.data.getLocalPosition(this.scene, this.mousePosition);
        if(this.awaitingAction && (Math.abs(this.mousePosition.x - this.dragStartPosition.x) > MIN_DRAG || Math.abs(this.mousePosition.y - this.dragStartPosition.y) > MIN_DRAG)){
            this.awaitingAction = false;
            this.isDragging = true;
        }
    }

    public update(){
        if(this.selectedObject){
            this.selectedObject.x = Math.min(this.bounds.right, Math.max(this.bounds.left, this.mousePosition.x + this.objectStartPosition.x - this.dragStartPosition.x));
            this.selectedObject.y = Math.min(this.bounds.bottom, Math.max(this.bounds.top, this.mousePosition.y + this.objectStartPosition.y - this.dragStartPosition.y));
        }
    }

    public destroy(){
        this.onEndDrag = null;
        this.onStickySelect = null;
        this.isSticky = false;
        this.isDragging = false;
        this.selectedObject = null;
        for(let i = this.objects.length - 1; i >= 0; i--){
            this.removeObject(this.objects[i]);
        }
        this.scene.off('pointerup', this.draggableUp);
        this.scene.off('pointerdown', this.draggableDown);
        this.scene = null;
        this.draggableContainer = null;
        this.mousePosition = null;
        this.dragStartPosition = null;
        this.objectStartPosition = null;
        this.objects = null;
    }
}
