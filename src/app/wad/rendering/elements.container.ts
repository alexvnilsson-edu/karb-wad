import { computed, Directive, inject, input } from '@angular/core';
import { WadRenderService } from './render.service';

@Directive({
  selector: '[appWadElements]',
  host: {},
})
export class ElementsContainer {
  private renderService = inject(WadRenderService);
  transformMethod = input('translate');

  transform$ = computed(() => {
    const method = this.transformMethod();
    switch (method) {
      case 'translate':
        return this.getTransformByTranslate();
      case 'matrix':
        return this.getTransformByMatrix();
      default:
        throw new Error(`Invalid transform method: ${method}`);
    }
  });

  private getTransformByTranslate() {
    const height = this.renderService.height();
    return `translate(0, 100%)`;
  }

  private getTransformByMatrix() {
    const height = this.renderService.height();

    // Transformationsmatris:
    // (a c e
    //  b d f)
    const matrix = [
      // a c e
      [1, 1, 0],
      // b d f
      [1, 1, 0],
    ];
    // Samla a, b, c, d, e, f till funktionen: matrix(<a> <b> <c> <d> <e> <f>)
    const matrixFunction = [
      // a -- rad 1, kol 1
      matrix[0][0],
      // b -- rad 2, kol 1
      matrix[1][0],
      // c -- rad 1, kol 2
      matrix[0][1],
      // d -- rad 2, kol 2
      matrix[1][1],
      // e -- rad 1, kol 3
      matrix[0][2],
      // f -- rad 2, kol 3
      matrix[1][2],
    ];
    if (matrixFunction.length !== 6) {
      throw new Error(`Transformation matrix mismatch. Expect 3 x 2 matrix.`);
    }
    return `matrix(${matrixFunction.join(' ')})`;
  }
}
