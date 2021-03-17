export interface SlideArrayItem {
  element: HTMLLIElement
  position: number
}

export interface Distance {
  finalPosition: number
  startX: number
  movement: number
  movePosition: number
}

export interface SlideIndex {
  prev: number | null
  active: number
  next: number | null
}
