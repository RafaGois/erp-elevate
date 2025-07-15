export default interface AppContextProps {
    navbarVisibility?: boolean;
    loading?: boolean;
    reloading?: boolean;
    selectedMenuTab?: string;
    setNavbarVisibility?: (visibility: boolean) => void;
    setLoading?: (loading: boolean) => void;
    setReloading?: (reloading: boolean) => void;
    changeSelectedMenuTab?: (tab: string) => void;
}