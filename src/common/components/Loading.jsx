import styles from '../assets/css/loading.module.css'

const Loading = () => {
    return (
        <div className={styles.container} >
            <div className={styles.loading} >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading
