import React, { useRef } from "react";
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import MyCanvas from "./MyCanvas";
import styles from "./MyModal.module.css"

const MyModal = (props) => {
    const canvasRef = useRef();
    const updateTextarea = () => {
        const el = document.getElementById('hintTextarea');
        let hint = el.value;
        canvasRef.current.updateTodayHint()
    }
    const resetBtn = () => {
        canvasRef.current.resetFunc()
    }
    const applyBtn = () => {
        canvasRef.current.applyFunc()
    }
    const saveBtn = () => {
        canvasRef.current.saveFunc()
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                {/* <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <table>
                    <tr>
                        <td>
                            <MyCanvas pid={props.pid} gender={props.gender} personList={props.personList} ref={canvasRef} />
                        </td>
                        <td>
                            <FloatingLabel controlId="hintTextarea" label="今日のヒント">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '300px' }}
                                    rows={10}
                                    onChange={() => updateTextarea()}
                                />
                            </FloatingLabel>
                            <br />
                            <FloatingLabel
                                controlId="foodInput"
                                label="ラッキーフード"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="" />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="colorInput"
                                label="ラッキーカラー"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="" />
                            </FloatingLabel>
                            <div>
                                <Button variant="outline-info" size="mb" className={styles.button} onClick={() => resetBtn()} >
                                    リセット
                                </Button>{' '}
                                <Button variant="outline-primary" size="mb" id="reDraw" className={styles.button} onClick={() => applyBtn()} >
                                    描画
                                </Button>
                            </div>
                        </td>
                    </tr>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="secondary" className={styles.button} >閉じる</Button>
                <Button onClick={props.onHide} variant="primary" className={styles.button} onClick={() => saveBtn()} >保存</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default MyModal;
