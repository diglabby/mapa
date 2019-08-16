import React, { useState } from "react"

const SubscribesTestForm = ({ i, t, l }) => {

    const dataUi = { i: i, l: l, tl: { t: t, l: l} }

    const [mail, setMail] = useState('')
    const [checked, setChecked] = useState('')

    const onSetMail = (e) => setMail(e.target.value)

    const onSubscribe = () => {
        if (!mail && !checked) {
            alert('Please write your mail and choose subscribe')
        } else if (!mail) {
            alert('Please write your mail')
        } else if (!checked) {
            alert('Please choose subscribe')
        } else {
            const reqData = { mail: mail, type: checked, data: dataUi[checked] }
            console.log(i, t, l)
            alert('Send data on server. Mail: ' + reqData.mail + ', Type: ' + reqData.type + ', Data: ' + reqData.data)
            setMail('')
            setChecked('')
        }
    }

    return (
        <form
            onSubmit={onSubscribe}
            style={{
                height: '40px', display: 'grid', zIndex: 999,
                gridTemplateColumns: '250px 120px min-content', gridTemplateRows: '40px', gridGap: '8px'
            }}>
            <input type='email' value={mail} onChange={onSetMail} />
            <button type="submit">Subscribe</button>
            <div style={{
                height: '40px', display: 'grid', backgroundColor: 'rgb(247, 247, 247)',
                gridTemplateColumns: 'min-content min-content min-content', gridTemplateRows: '40px', gridGap: '10px'
            }}>
                <label >
                    Initiative
                    <input
                        type='radio' value="i" checked={'i' === checked}
                        onChange={() => setChecked('i')}
                    />   
                </label>
                <label >
                    Location
                    <input
                        type='radio' value="l" checked={'l' === checked}
                        onChange={() => setChecked('l')}
                    />
                </label>
                <label >
                    TagsLocation
                    <input
                        type='radio' value="tl" checked={'tl' === checked}
                        onChange={() => setChecked('tl')}
                    /> 
                </label>
            </div>
        </form>
    )
}

export default SubscribesTestForm