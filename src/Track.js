class Track {
    constructor(height) {
        this._height = height
        this._head = {
            top: 0,
            height,
            show: 0,
            hide: 0,
            next: null
        }
    }

    get height() {
        return this._height
    }

    /**
     * 向轨道中插入一条弹幕并获取插入位置 top 值
     * @param {Number} height 弹幕高度
     * @param {Number} start 显示时的 Unix 时间戳
     * @param {Number} hide 消失时的 Unix 时间戳
     * @param {Number} animation 动画时长
     * @returns {Number} 插入位置 top 值
     */
    insert(height, start, hide, animation = 0) {
        let show = start + animation
        let finish = hide - animation

        if (height >= this._height) {
            this._head.height = this._height
            this._head.next = null
            this._head.show = show
            this._head.hide = hide
            return 0
        }

        let best = this._head
        let findAt = null
        let need = 0
        for (let cur = this._head; cur !== null; cur = cur.next) {
            if (start >= cur.show && finish >= cur.hide) {
                if (findAt === null) {
                    if (height < cur.height) {
                        let track = {
                            top: cur.top + height,
                            height: cur.height - height,
                            show: 0,
                            hide: 0,
                            next: cur.next
                        }
                        cur.height = height
                        cur.show = show
                        cur.hide = hide
                        cur.next = track
                        return cur.top
                    } else if (height === cur.height) {
                        cur.show = show
                        cur.hide = hide
                        return cur.top
                    } else {
                        need = height - cur.height
                        findAt = cur
                    }
                } else {
                    if (need < cur.height) {
                        cur.top += need
                        cur.height -= need
                        findAt.height = height
                        findAt.show = show
                        findAt.hide = hide
                        findAt.next = cur
                        return findAt.top
                    } else if (need === cur.height) {
                        findAt.height = height
                        findAt.show = show
                        findAt.hide = hide
                        findAt.next = cur.next
                        return findAt.top
                    } else {
                        need -= cur.height
                    }
                }
            } else {
                findAt = null
            }
            if (this._height - cur.top >= height) {
                if (cur.show < best.show) {
                    best = cur
                }
            } else {
                break
            }
        }

        need = height
        for (let cur = best; cur !== null; cur = cur.next) {
            if (cur === best) {
                if (height < best.height) {
                    let track = {
                        top: best.top + height,
                        height: best.height - height,
                        show: 0,
                        hide: 0,
                        next: best.next
                    }
                    best.height = height
                    best.show = show
                    best.hide = hide
                    best.next = track
                    return best.top
                } else if (height === best.height) {
                    best.show = show
                    best.hide = hide
                    return best.top
                } else {
                    need -= best.height
                }
            } else {
                if (need < cur.height) {
                    cur.top += need
                    cur.height -= need
                    best.height = height
                    best.show = show
                    best.hide = hide
                    best.next = cur
                    return best.top
                } else if (need === cur.height) {
                    best.height = height
                    best.show = show
                    best.hide = hide
                    best.next = cur.next
                    return best.top
                } else {
                    need -= cur.height
                }
            }
        }
    }

    clear() {
        this._head.height = this._height
        this._head.show = 0
        this._head.hide = 0
        this._head.next = null
    }

}

export default Track
