import { create } from 'zustand'

interface INavMenu {
    navMenuStatus: boolean;
    changeNavMenuStatus: () => void;
}

const useNavMenu = create<INavMenu>((set) => ({
    navMenuStatus: false,
    changeNavMenuStatus: () => set((state) => ({ navMenuStatus: !state.navMenuStatus })),
}))

export default useNavMenu