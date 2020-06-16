import React, { memo, useEffect, useState, useCallback } from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { Card, CardHeader, CardContent, Divider, Avatar, Typography, Container } from '@material-ui/core'

import { mockListOne, mockListTwo } from './mock'

const Home = memo(() => {
  const [listOne, setListOne] = useState([])
  const [listTwo, setListTwo] = useState([])

  useEffect(() => {
    setListOne(mockListOne)
  }, [])

  useEffect(() => {
    setListTwo(mockListTwo)
  }, [])

  const getItemStyle = useCallback(
    (isDragging, draggableStyle) => ({
      userSelect: 'none',
      padding: 10,
      margin: `0 0 8px 0`,
      background: isDragging ? '#eeeeee' : '#f50057',
      ...draggableStyle,
    }),
    []
  )

  const getListStyle = useCallback(
    (isDraggingOver) => ({
      background: isDraggingOver ? '#f48fb1' : '#eeeeee',
    }),
    []
  )

  const handleReorder = useCallback((list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }, [])

  const handleMove = useCallback((listSource, listDestination, startIndex, endIndex) => {
    const sourceClone = Array.from(listSource)
    const destinationClone = Array.from(listDestination)

    const [removed] = sourceClone.splice(startIndex, 1)

    destinationClone.splice(endIndex, 0, removed)

    return { newListSource: sourceClone, newListDestination: destinationClone }
  }, [])

  const handleDragEnd = useCallback(
    ({ source, destination }) => {
      if (!destination) {
        return
      }

      if (source.droppableId === destination.droppableId) {
        if (source.droppableId === 'listOne') {
          setListOne(handleReorder(listOne, source.index, destination.index))
        } else {
          setListTwo(handleReorder(listTwo, source.index, destination.index))
        }
      } else {
        if (source.droppableId === 'listOne') {
          const { newListSource, newListDestination } = handleMove(listOne, listTwo, source.index, destination.index)
          setListOne(newListSource)
          setListTwo(newListDestination)
        } else {
          const { newListSource, newListDestination } = handleMove(listTwo, listOne, source.index, destination.index)
          setListOne(newListDestination)
          setListTwo(newListSource)
        }
      }
    },
    [listOne, listTwo, handleReorder, handleMove]
  )

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <Typography variant="h5">Simple vertical list (react-beautiful-dnd)</Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="listOne">
            {(provided, snapshot) => (
              <Card style={{ width: 250, background: '#eeeeee' }}>
                <CardHeader title="List One" />
                <Divider />
                <CardContent ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  {listOne.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: '10px' }}>
                              <Avatar src={`https://i.pravatar.cc/150?img=${item.image}`} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle1" style={{ color: '#ffffff' }}>
                                {item.name}
                              </Typography>
                            </div>
                          </div>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                </CardContent>
              </Card>
            )}
          </Droppable>

          <Droppable droppableId="listTwo">
            {(provided, snapshot) => (
              <Card style={{ width: 250, background: '#eeeeee' }}>
                <CardHeader title="List Two" />
                <Divider />
                <CardContent ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  {listTwo.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: '10px' }}>
                              <Avatar src={`https://i.pravatar.cc/150?img=${item.image}`} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle1" style={{ color: '#ffffff' }}>
                                {item.name}
                              </Typography>
                            </div>
                          </div>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                </CardContent>
              </Card>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Container>
  )
})

export default Home
