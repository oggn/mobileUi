import React, { Children, ReactElement, cloneElement } from 'react'
import { Section } from './view/Section'
import { Container } from './view/Container'
import { Column } from './view/Column'
import { Row } from './view/Row'
import { Form } from './view/Form'
import { ScrollDragHorizontal } from './view/ScrollDragHorizontal'
import { Items } from './view/Items'
import { Item } from './view/Item'

export function V({ children }: { children: ReactElement }) {
    const child = Children.only(children)

    return (
        <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            {cloneElement(child, { ...child.props })}
        </div>
    )
}

V.Section = Section
V.Container = Container
V.Column = Column
V.Row = Row
V.Form = Form
V.ScrollDragHorizontal = ScrollDragHorizontal
V.Items = Items
V.Item = Item
