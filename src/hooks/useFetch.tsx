import { useEffect, useState } from "react";
import Note from "../interfaces/Note"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PATH_TO_REF } from '../constants'

export default function useFetch(search: string) {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [notes, setNotes] = useState<Note[]>()
    
    useEffect(() => {
        (async () => {
            try {
                let notesStr = await AsyncStorage.getItem(PATH_TO_REF)
                if (notesStr === null) return
                let unpacked = JSON.parse(notesStr)
                let pinned: Note[] = []
                let unpinned: Note[] = []
                if (search === "") {
                    unpacked.forEach((note: Note) => {
                        note.isPinned ?  pinned.push(note) :  unpinned.push(note)
                    })
                } else {
                    unpacked.filter((note: Note) => note.name.startsWith(search)).forEach((note: Note) => {
                        note.isPinned ?  pinned.push(note) :  unpinned.push(note)
                    })
                }
                setNotes([...pinned, ...unpinned])
            } catch {
                setError(true)
            } finally {
                setLoading(false)
            }
        })()
    }, [search])
    return { loading, error, notes }
}