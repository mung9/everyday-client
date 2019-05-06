import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import _ from 'lodash';

class ModifModal extends Component {
  constructor(props) {
    super(props);

    this.formControl = React.createRef();

    const value = props.item ? props.item[props.propertyName] : '';
    this.state = { value };
  }

  componentDidUpdate(prevProps, prevState) {
    const {item, propertyName} = this.props;
    if (item !== prevProps.item) {
      this.formControl.current.focus();
      const value = (item ? item[propertyName] : '');
      this.setState({ value });
    }
  }

  handleChange = ({ currentTarget }) => {
    this.setState({ value: currentTarget.value });
  }

  handleConfirm = () =>{
    const {item, propertyName, onConfirm} = this.props;
    const confirmedItem = _.set(item, propertyName, this.state.value);
    onConfirm(confirmedItem);
  }

  render() {
    const { value } = this.state;

    const {
      show,
      propertyName,
      placeholder,
      onClose
    } = this.props;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Type new title.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              ref={this.formControl}
              value={value}
              onChange={this.handleChange}
              name={propertyName}
              placeholder={placeholder}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
                </Button>
          <Button variant="primary" onClick={this.handleConfirm}>
            Save Changes
                </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModifModal;