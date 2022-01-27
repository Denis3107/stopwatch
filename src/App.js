import './App.css';
import {useEffect, useState} from "react";
import Timer from "./components/Timer/Timer";
import Buttons from "./components/Buttons/Buttons";
import {Subject, interval, fromEvent} from "rxjs";
import {map, takeUntil, buffer, debounceTime, filter} from "rxjs/operators";

function App() {

    const [time, setTime] = useState(0)
    const [status, setStatus] = useState(false)

    function start() {
        if (!status) {
            setStatus(true)
        } else {
            setStatus(false)
            setTime(0)
        }
    }

    function reset() {
        setTime(0)
        setStatus(true)
    }

    function wait() {
        const wait$ = fromEvent(document.querySelector(".Buttons__Wait"), "click")
        const buff$ = wait$.pipe(debounceTime(300))
        const clickWait$ = wait$.pipe(
            buffer(buff$),
            map((list) => {
                return list.length
            }),
            filter((cl) => cl === 2)
        )
        clickWait$.subscribe(() => {
            setStatus(false)
        })
    }

    useEffect(() => {
        const stream$ = new Subject();
        interval(1000).pipe(takeUntil(stream$)).subscribe(() => {
            if (status) {
                setTime((prev) => prev + 1000);
            }
        })

        return () => {
            stream$.next()
            stream$.complete()
            stream$.unsubscribe()
        };
    }, [status])

    return (
        <div className="stopWatch">
            <Timer time={new Date(time).toISOString().slice(11, 19)}/>
            <Buttons start={start} status={status} reset={reset} wait={wait}/>
        </div>
    );
}

export default App;
