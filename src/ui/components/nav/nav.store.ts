import { create } from 'zustand'

interface INavMenu {
    navMenuStatus: boolean;
}

interface INavMenuActions {
    changeNavMenuStatus: () => void;
}

const useNavMenu = create<INavMenu & INavMenuActions>((set) => ({
    navMenuStatus: false,
    changeNavMenuStatus: () => set((state) => ({ navMenuStatus: !state.navMenuStatus })),
}))

export default useNavMenu