import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class ModalBox extends Component {
  constructor() {
    super();
    this.state = { modalOpen: false }
    this.handleOpen = this.handleOpen.bind(this);
  }
  

  //handleOpen = () => this.setState({ modalOpen: true })
  handleOpen(){
    this.setState({ modalOpen: true})
    this.props.handleClick()
  }

  handleClose = () => this.setState({ modalOpen: false })

  render() {
      if(this.props.completedQuiz) {
        document.getElementById("quiz-answer-block").style.display = 'block';
        return <div></div>
      } else {
        
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Submit Quiz</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='browser' content='Unable to Submit' />
        <Modal.Content>
          <h3>Not all of the quiz questions have been answered yet.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )}
  }
}
