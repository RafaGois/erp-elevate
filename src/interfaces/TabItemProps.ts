export default interface TabItemProps {
    text: string;
    icon: React.ReactNode;
    selected?: boolean;
    setSelected?: (selectedTab: string) => void;
}