import React, { useState } from 'react'

interface Props {
    getFullName: (username: string) => Promise<string>
}

function DisplayText({ getFullName }: Props) {
    const [ txt, setTxt ] = useState('');
    const [ msg, setMsg ] = useState('');
    
    const onChangeTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTxt(e.target.value);
    }

    const onClickShowMsg = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setMsg(`React testing, ${await getFullName(txt)}`);
    }


    return (
        <form>
            <div>
                <label>Enter your name</label>
            </div>
            <div>
                <input data-testid='user-input' value={txt}
                    onChange={onChangeTxt} 
                />
            </div>
            <div>
                <button data-testid='input-submit'
                    onClick={onClickShowMsg}
                >
                    Show MSG
                </button>
            </div>
            <div>
                <label data-testid='final-msg'>{msg}</label>
            </div>
        </form>
    )
}

export default DisplayText