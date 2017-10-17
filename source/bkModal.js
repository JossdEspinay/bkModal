import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './bkModal.css';

class bkModal extends Component {

  /**
   * Calls the onClose props CallBack if it exist
   * Is used by the parent element to close the modal
   * @param e
   */
  onClose(e) {
    e.preventDefault();
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  /**
   * when a clik event is triggered on the modal overlay
   * checks if the modal should close or not.
   * @param e
   */
  onOverlayClick(e) {
    if (this.props.canBeClosedOnOverlayClick && !this.refs['bk-modal'].contains(e.target)) {
      this.onClose(e);
    }
  }

  /**
   * if the props variable isOpen changes
   * toggle the modalOpened class on the body
   * @param prevProps
   */
  isOpenChanges(prevProps) {
    const { isOpen } = this.props;
    if (isOpen === prevProps.isOpen) return;
    if (!isOpen) {
      window.document.body.classList.remove('modalOpened');
    } else if (!window.matchMedia("(min-width: 768px)").matches && isOpen) {
      window.document.body.classList.add('modalOpened');
    }
  }

  /**
   * When the component is updated (see lifecycle)
   * calls the isOpenChanges.
   *
   * @param prevProps: previous props
   * @param prevState: previous state
   */
  componentDidUpdate(prevProps, prevState) {
    this.isOpenChanges(prevProps);
  }

  render() {
    const {
      title,
      children,
      isOpen,
      closeElementClassName,
      closeLabel} = this.props;
    const openclass = isOpen ? "bk-modal-open" : "";
    return (
      <div className={openclass}>
        <div className="bk-modal-overlay" onClick={ (e) => this.onOverlayClick(e)}>
          <div className="bk-modal" ref="bk-modal">
            <div className="bk-modal__title">
              <span ref="close"
                    onClick={(e) => this.onClose(e)}
                    className={closeElementClassName ? closeElementClassName : 'bk-modal-default-close-icon-class'}>
                {closeLabel ? <span>{closeLabel}</span> : <span>(close)</span> }
              </span>
              {title}
            </div>
            <div className="bk-modal__content">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

bkModal.propTypes = {
  isOpen: PropTypes.PropTypes.bool,
  title: PropTypes.PropTypes.string,
  children: PropTypes.PropTypes.node,
  onClose: PropTypes.PropTypes.func,
  closeElementClassName: PropTypes.PropTypes.string,
  closeLabel: PropTypes.PropTypes.string,
  canBeClosedOnOverlayClick: PropTypes.PropTypes.bool
};

export default bkModal;

