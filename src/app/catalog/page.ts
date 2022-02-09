import Konva from 'konva';
import { TextStyle, Decoration } from '../catalog/generate/catalog-model';

export class Page {
  id = 0;
  stage: Konva.Stage;
  layer: Konva.Layer;
  width = 0;
  height = 0;
  elements: Konva.Node[] = [];
  selectedShape: Konva.Node = null;

  constructor(id: number, width: number, height: number) {
    this.id = id;
    this.width = width;
    this.height = height;
  }

  drawPage() {
    this.stage = new Konva.Stage({
      container: `page-${this.id}`,
      width: this.width,
      height: this.height
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.onClickStage();
    this.onKeydown();
  }

  public addImage = (img: string, x: number = 50, y: number = 50, width: number = 100, height: number = 100, opacity: number = 1): void => {
    // create img node
    let imageObj = new Image();
    imageObj.src = img;
    const imgNode = new Konva.Image({
      x,
      y,
      image: imageObj,
      width,
      height,
      name: 'shape',
      draggable: true,
      opacity,
    });
    // add the shape to the layer
    this.layer.add(imgNode);
    this.layer.batchDraw();
    // handleTransform event
    imgNode.on('transform', function () {
      // reset scale
      imgNode.setAttrs({
        width: imgNode.width() * imgNode.scaleX(),
        height: imgNode.height() * imgNode.scaleY(),
        scaleX: 1
      });
    });
    // add new konva node to the list of element
    this.elements.push(imgNode);
  }

  public addDecoration = (decoration: Decoration) => {
    if (decoration.type == "rect") {// if rectangle
      const rectNode = new Konva.Rect({
        x: decoration.position.x,
        y: decoration.position.y,
        width: decoration.width,
        height: decoration.height,
        fill: decoration.fill,
        draggable: true,
        name: 'shape',
      });
      // add the rect to the layer
      this.layer.add(rectNode);
      this.layer.batchDraw();
      // add new konva node to the list of element
      this.elements.push(rectNode);
    }
  }

  public addText = (text: string = "Entrez un texte ici (double cliquez)", x: number = 50, y: number = 50, style: TextStyle) => {
    const textNode = new Konva.Text({
      text,
      x,
      y,
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      fontStyle: style.fontStyle,
      fill: style.fill,
      align: style.align,
      draggable: true,
      rotation: style.rotation,
      width: style.width,
      height: style.height,
      name: 'shape',
    });

    this.layer.add(textNode);
    this.layer.draw();

    // add new konva node to the list of element
    this.elements.push(textNode);

    // redraw the layer after 2 seconds to wait for the font-family to be loaded
    setTimeout(() => {
      this.layer.draw();
    }, 5000);


    textNode.on('dblclick', () => {

      // create textarea and style it
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
      const input = document.createElement('input');
      input.classList.add("form-control");
      const modalContent = document.getElementById("myModalContent");
      modalContent.appendChild(input);
      input.value = textNode.text();
      input.focus();

      input.addEventListener('keydown', (e) => {
        // hide on enter
        if (e.keyCode === 13) {
          textNode.text(input.value);
          this.layer.draw();
          document.getElementById("myModalContent").removeChild(input);
          document.getElementById("myModal").style.display = "none";
        }
      });
    });
  }

  private onKeydown() {
    document.addEventListener('keydown', (e) => {
      // if press delete on selected shape
      if (this.selectedShape && e.keyCode == 46) {
        e.preventDefault();
        this.removeSelectedShape();
      }
    });
  }

  private removeSelectedShape() {
    this.selectedShape.destroy();
    this.deleteTransformers();
    const newShapes = this.elements.filter((shape) => shape !== this.selectedShape);
    this.elements = newShapes;
    this.layer.batchDraw();
  }

  private onClickStage() {
    this.stage.on('click tap', (e) => {
      // select shape on click
      this.selectedShape = this.findShape(e.target);
      // add transformer to shape on click
      this.addTransformerToSelectedShape(e.target);
    });
  }

  private findShape(shapeNode: Konva.Node): Konva.Node {
    for (let shape of this.elements) {
      if (shape === shapeNode) {
        return shape;
      }
    }
  }

  private addTransformerToSelectedShape(shape: Konva.Node) {
    // if click on empty area - remove all transformers
    if (shape === this.stage) {
      this.deleteTransformers();
      this.layer.draw();
      return;
    }
    // do nothing if clicked NOT on our rectangles
    if (!shape.hasName('shape')) {
      return;
    }
    // remove old transformers
    this.deleteTransformers();
    this.addTranformer(shape);
  }

  private deleteTransformers() {
    const transformers = this.stage.find('Transformer');
    transformers.each((tr) => {
      tr.destroy();
    });
  }

  private addTranformer(shape: Konva.Node) {
    const tr = new Konva.Transformer({
      keepRatio: false,
    });
    this.layer.add(tr);
    tr.attachTo(shape);
    this.layer.draw();
  }
}